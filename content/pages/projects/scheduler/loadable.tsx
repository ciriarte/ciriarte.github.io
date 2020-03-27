import React from "react";
import loadable from '@loadable/component';

const LoadableCalendar = loadable(() => import('./scheduler'))

export default () => {
  return (
    <div>
      <LoadableCalendar />
    </div>
  );
};



