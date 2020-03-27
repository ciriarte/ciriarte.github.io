import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import "./scheduler.scss";
import { useEffect, useState } from "react";

interface DemoAppState {
  calendarWeekends: boolean;
  calendarEvents: EventInput[];
}

interface DemoAppProps {
  scenario: { resources: any }
}

export class DemoApp extends React.Component<DemoAppProps, DemoAppState> {
  calendarComponentRef = React.createRef<FullCalendar>();

  constructor(props: DemoAppProps) {
    super(props);

    this.state = {
      calendarWeekends: true,
      calendarEvents: [
        // initial event data
        { title: "Event Now", start: new Date() },
      ],
    };
  }

  render() {
    return (
        <div className="scheduler-app-calendar">
          <FullCalendar
            defaultView="resourceTimeGridDay"
            header={{
              left: "prev,next today",
              center: "title",
              right:
                "resourceTimelGridThreeDays, resourceTimeGridDay, resourceTimelineWeek",
            }}
            plugins={[
              timeGridPlugin,
              interactionPlugin,
              resourceTimeGridPlugin,
              resourceTimelinePlugin,
            ]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            dateClick={this.handleDateClick}
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            resourceLabelText="Nurse Name"
            nowIndicator={true}
            views={{
              resourceTimelGridThreeDays: {
                type: "resourceTimeGrid",
                duration: { days: 7 },
                buttonText: "7 days",
                titleFormat: { year: 'numeric', month: 'numeric', day: "numeric" }
              },
            }}
            resources={[
              { id: "a", title: "Alice" },
              { id: "b", title: "Bob" },
              { id: "c", title: "Chris" },
              { id: "d", title: "Daniela" },
              { id: "f", title: "Edgar" },
            ]}
            events={
              "https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline"
            }
          />
        </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  handleDateClick = (arg: any) => {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }

    const data = {
      num_nurses: 5,
      num_shifts: 3,
      num_days: 7,
      // nurse 'n' works shift 's' on day 'd'.
      shift_requests: [
        [
          [0, 0, 1],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1],
          [0, 1, 0],
          [0, 0, 1],
        ],
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 1, 0],
          [0, 1, 0],
          [1, 0, 0],
          [0, 0, 0],
          [0, 0, 1],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
          [0, 0, 0],
          [1, 0, 0],
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
        [
          [0, 0, 1],
          [0, 0, 0],
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
          [1, 0, 0],
          [0, 0, 0],
        ],
        [
          [0, 0, 0],
          [0, 0, 1],
          [0, 1, 0],
          [0, 0, 0],
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
      ],
    };

    const url =
      "https://p9ipn9wfsj.execute-api.us-east-1.amazonaws.com/prod/scheduler";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(console.log);
  };
}


const Scenario: React.FunctionComponent = (props) => {
  const [hasError, setErrors] = useState(false);
  const [scenario, setScenario] = useState({} as { resources: any });

  const fetchResources = async () => {
    const res = await fetch("/static/scenarios.json");
    res.json()
       .then(j => setScenario(j))
       .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchResources()
  }, [])

  if (!scenario.resources || hasError) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="scheduler-scenario">
        <p>
          {scenario.resources.map((r: any, i: number) => {
            return (
              <span  key={`r${i}`}>
                <Resource name={r.name} />
                {i < scenario.resources.length - 2 ? ", " : " and "}
              </span>
            )
          })} are nurses working in a clinic:
        </p>
        <ul>
          {scenario.resources.flatMap((r: any, i: number) => {
            const weekday = [
              "Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"
            ]

            return r.shift_requests.flatMap((req: any, j: number) => (
              ["morning", "afternoon", "evening"]
                .map((s: string, k: number) => {
                  return req[k] === 1 ? (
                  <li key={`sr${i * 100 + j * 10 + k}`}>
                    {r.name} would like to take {weekday[j]} {s} off.
                  </li>
                  ) : null
                })
            ))
          })}
        </ul>
      </div>
      <DemoApp scenario={scenario} />
    </div>
  )
}

const Resource: React.FunctionComponent<{name: string}> = (props) => {
  const { name } = props
  return (
    <span className="scheduler-resourceName">{name}</span>
  )
}

export default Scenario;
