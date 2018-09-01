import * as R from "ramda";

const FILTER = {
  byActivity: activity => R.filter(datum => activity.test(datum.BLDB_ACTIVITY)),
  byBLDType: BLD_Type => R.filter(datum => BLD_Type.test(datum.BLD_Type)),
  byStartDate: beginDate =>
    R.filter(datum => new Date(datum.ISSUE_DATE) > new Date(beginDate)),
  byEndDate: endDate =>
    R.filter(datum => new Date(datum.ISSUE_DATE) < new Date(endDate))
};

const MSGS = {
  FETCHED_DATA: "FETCHED_DATA",
  UPDATE_ACTIVITY: "UPDATE_ACTIVITY",
  UPDATE_BLD_TYPE: "UPDATE_BLD_TYPE",
  UPDATE_START_DATE: "FILTER_BY_START_DATE",
  UPDATE_END_DATE: "FILTER_BY_END_DATE",
  UPDATE_MAP: 'UPDATE_MAP'
};

export function updateBldActivityMsg(activity) {
  return {
    type: MSGS.UPDATE_ACTIVITY,
    activity
  }
}

export function updateBldTypeMsg(BLDType) {
  return {
    type: MSGS.UPDATE_BLD_TYPE,
    BLDType
  }
}

export function updateMapMsg(map, heat) {
  return {
    type: MSGS.UPDATE_MAP,
    map,
    heat
  }
}



export function dataFetchedMsg(data) {
  return {
    type: MSGS.FETCHED_DATA,
    data
  }
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.FETCHED_DATA: {
      const data = msg.data;
      const total = msg.data.length;
      return { ...model, data, total };
    }
    case MSGS.UPDATE_ACTIVITY: {
      const activity = msg.activity;
      const activityRegex = new RegExp(activity);
      const filters = {
        ...model.filters,
        byActivity: FILTER.byActivity(activityRegex)
      };
      return { ...model, filters, refreshMap: true };
    }
    case MSGS.UPDATE_BLD_TYPE: {
      const BLDType = msg.BLDType;
      const bldTypeRegex = new RegExp(BLDType);
      const filters = {
        ...model.filters,
        byBLDType: FILTER.byBLDType(bldTypeRegex)
      };
      return { ...model, filters, refreshMap: true };
    }
    case MSGS.UPDATE_END_DATE: {
      const endDate = msg.endDate;
      const filters = {
        ...model.filters,
        byEndDate: FILTER.byEndDate(endDate)
      }
      return { ...model, filters, refreshMap: true};
    }
    case MSGS.UPDATE_START_DATE: {
      const startDate = msg.startDate;
      const filters = {
        ...model.filters,
        byStartDate: FILTER.byStartDate(startDate)
      }
      return { ...model, filters, refreshMap: true };
    }
    case MSGS.UPDATE_MAP: {
      const heat = msg.heat;
      const map = msg.map;
      return { ...model, map, heat, refreshMap: false };
    }
    default:
      return model;
  }
}

export default update;
