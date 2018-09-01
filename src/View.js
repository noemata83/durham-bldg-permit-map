import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { updateBldActivityMsg, updateBldTypeMsg, dataFetchedMsg } from './Update';
import DrawMap, { RedrawMap } from './map';
import { activityTypeOptions, bldgTypeOptions } from './options';

const {
  div,
  h1,
  label,
  input,
  select,
  option,
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

const formSet = (dispatch, model) => {
  return div('#filterForm',{ className: 'absolute w-20 h-30 pa3 bg-white' }, [
  h1({ className: 'f1 lh-title'}, 'Durham Building Permit Activity'),
  selectSet(dispatch, 'Building Activity:', activityTypeOptions, updateBldActivityMsg),
  selectSet(dispatch, 'Building Type:', bldgTypeOptions, updateBldTypeMsg)
  ]);
}

function view(dispatch, model) {
  const { filters, data, total, map, heat, refreshMap } = model;
  const filterSet = Object.values(filters).filter(item => item !== null);
  const filterData = filterSet.length > 0 ? 
    R.pipe(...filterSet) :
    (data) => data;
  if (!data) {
    fetchData('./data/permits.json').then(fetchedData => {
      dispatch(dataFetchedMsg(fetchedData));
      });
  }
  if (document.getElementById('map')) {
    DrawMap(dispatch, filterData(data), map);
  }
  if (refreshMap) {
    RedrawMap(dispatch, filterData(data), map, heat, total);
  }
  return div({ style: 'width: 100vw; height: 100vh' }, [
    formSet(dispatch, model),
    div({
      id: 'map',
      style: 'width: 100%; height: 100%'
    })    
    // pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;