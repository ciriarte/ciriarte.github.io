import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import "./scheduler.scss";
import { useEffect, useState } from "react";

interface DemoAppProps {
  scenario: { resources: any }
}

const eventsUrl = "https://qeca46csxd.execute-api.us-east-1.amazonaws.com/prod/scheduler";

const DemoApp: React.FunctionComponent<DemoAppProps> = (props) => {
  const calendarComponentRef = React.createRef<FullCalendar>();
  const [calendarWeekends, setCalendarWeekends] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([
    { title: "Event Now", start: new Date() },
  ]);

  const { scenario } = props;

  const [hasError, setErrors] = useState(false);
  const [events, setEvents] = useState([] as any);
  //const [dateRange, setDateRange] = useState({ startStr: toIso8601String(normalizedDate()) } as any);
  const [dateRange, setDateRange] = useState({ startStr: toIso8601String(normalizedDate()) } as any);

  const fetchEvents = async () => {
    const res = await fetch(eventsUrl, {
      method: 'POST',
      body: JSON.stringify(
        {...scenario, ...dateRange}
      ),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    res.json()
       .then(j => setEvents(j.shifts))
       .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  if (!events || hasError) {
    return <div>Loading...</div>
  }

  console.log(events)

  return (
      <div className="scheduler-app-calendar">
        <FullCalendar
          timeZone='UTC'
          defaultDate={normalizedDate()}
          defaultView="resourceTimelGridThreeDays"
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
          ref={calendarComponentRef}
          weekends={calendarWeekends}
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          resourceLabelText="Nurse Name"
          nowIndicator={true}
          views={{
            resourceTimelGridThreeDays: {
              type: "resourceTimeGrid",
              duration: { days: 3 },
              buttonText: "3 days",
              titleFormat: { year: 'numeric', month: 'numeric', day: "numeric" }
            },
          }}
          resources={scenario.resources}
          events={events}
        />
      </div>
  );

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
                <Resource name={r.title} />
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
                    {r.title} would like to take {weekday[j]} {s} off.
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

const normalizedDate = () => {
  let d = new Date()
  d.setMilliseconds(0)
  d.setSeconds(0)
  d.setMinutes(0)
  d.setHours(0)
  return d
}

const toIso8601String = function(date) {
  var tzo = 0,//-date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };
  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
}


export default Scenario;
