import React from "react"
import Loadable from 'react-loadable';


const LoadableCalendar = Loadable({
    loader:()=>import('./scheduler'),
    loading() {
        return <div>Loading...</div>
      }
})

export default () => <div><LoadableCalendar /></div>
