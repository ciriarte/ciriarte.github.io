import * as React from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

import './scheduler.scss'

interface DemoAppState {
  calendarWeekends: boolean
  calendarEvents: EventInput[]
}

export default class DemoApp extends React.Component<{}, DemoAppState> {

  calendarComponentRef = React.createRef<FullCalendar>()

  constructor(props: {}) {
    super(props)

    this.state = {
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() }
      ]
    }
  }

  render() {
    return (
      <div className='scheduler-app'>
        {/* <div className='scheduler-app-top'>
          <fieldset>
            <label><input type="text" /></label>
            <label><input type="text" /></label>
          </fieldset>
        </div> */}
        <div className='scheduler-app-calendar'>
          <FullCalendar
            defaultView='resourceTimeGridDay'
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'resourceTimelGridThreeDays, resourceTimeGridDay, resourceTimelineWeek'
            }}
            plugins={[ timeGridPlugin, interactionPlugin, resourceTimeGridPlugin, resourceTimelinePlugin ]}
            ref={ this.calendarComponentRef }
            weekends={ this.state.calendarWeekends }
            // events={ this.state.calendarEvents }
            dateClick={ this.handleDateClick }
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            resourceLabelText='Nurse Name'
            views={{
               resourceTimelGridThreeDays: {
                type: 'resourceTimeGrid',
                duration: { days: 3 },
                buttonText: '3 days'
              }
            }}
            resources={[
              { id: 'a', title: 'Alice' },
              { id: 'b', title: 'Bob' },
              { id: 'c', title: 'Chris' },
              { id: 'd', title: 'Daniela' },
            ]}
            events={'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline'}
            />
        </div>
      </div>
    )
  }

  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  handleDateClick = (arg: any) => {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat({ // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      })
    }
  }

}
