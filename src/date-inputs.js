import datepicker from 'js-datepicker';
import { updateBeginDateMsg, updateEndDateMsg, updateDateInputFlag } from './Update';

export default (dispatch) => {
  if (document.querySelector('#beginDate')) {
    datepicker(document.querySelector('#beginDate'), {
      dateSelected: new Date(2007, 0, 1),
      onSelect: (e) => { 
        dispatch(updateBeginDateMsg(e.dateSelected))
      }
    });

    datepicker(document.querySelector('#endDate'), {
      dateSelected: new Date(Date.now()),
      onSelect: (e) => dispatch(updateEndDateMsg(e.dateSelected)),
    });

    dispatch(updateDateInputFlag());
  }
}