import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { updateBldActivityMsg, updateBldTypeMsg, updatePmtStatusMsg, dataFetchedMsg } from './Update';
import DrawMap, { RedrawMap } from './map';
import { activityTypeOptions, bldgTypeOptions, pmtStatusOptions } from './options';

const {
  div,
  h1,
  label,
  input,
  select,
  option,
  p,
} = hh(h);

async function fetchData(url) {
  const res = await fetch(url);
  const rawData = await res.json();
  return rawData.map(datum => ({
    ...datum,
    geometry: JSON.parse(datum.geometry.replace(/\'/g, '"'))
  }));
}

const selectSet = (dispatch, inputLabel, options, updateMsg) => {
  return div({ className: 'pa2 mb2 mt2' }, label([
    inputLabel,
    select({ className: 'w-100', onchange: (e) => dispatch(updateMsg(e.target.value))}, options.map(opt => 
    option({ value: opt.value }, opt.label),
    )),
  ])
);
}

const formSet = (dispatch, model, numRecords) => {
  return div('#filterForm',{ className: 'absolute w-20 h-30 pa3 bg-white' }, [
  h1({ className: 'f1 lh-title'}, 'Durham Building Permit Activity'),
  selectSet(dispatch, 'Building Type:', bldgTypeOptions, updateBldTypeMsg),
  selectSet(dispatch, 'Building Activity:', activityTypeOptions, updateBldActivityMsg),
  selectSet(dispatch, 'Permit Status', pmtStatusOptions, updatePmtStatusMsg),
  p({ className: 'pa2'}, `Number of Records in Current View: ${numRecords}`)
  ]);
}

function view(dispatch, model) {
  const { filters, data, total, map, heat, refreshMap } = model;
  const filterSet = Object.keys(filters)
    .map(key => filters[key])
    .filter(item => item !== null);
  const filterData = filterSet.length > 0 ? 
    R.pipe(...filterSet) :
    (data) => data;
  if (!data) {
    fetchData('./data/permits.json').then(fetchedData => {
      dispatch(dataFetchedMsg(fetchedData));
      });
  }

  // Impure code below
  if (document.getElementById('map')) {
    DrawMap(dispatch, filterData(data), map);
  }
  if (refreshMap) {
    RedrawMap(dispatch, filterData(data), map, heat, total);
  }
  // Impure code above
  return div({ style: 'width: 100vw; height: 100vh' }, [
    formSet(dispatch, model, data ? filterData(data).length : 0),
    div({
      id: 'map',
      style: 'width: 100%; height: 100%'
    })    
    // pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;