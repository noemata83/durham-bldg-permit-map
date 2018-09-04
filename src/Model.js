const initModel = {
  minDwellingUnits: 0,
  maxDwellingUnits: Number.MAX_SAFE_INTEGER,
  filters: {
    byActivity: null,
    byBldType: null,
    byStartDate: null,
    byEndDate: null,
    byPmtStatus: null,
  },
  data: null,
  total: 0,
  map: null,
  heat: null,
  refreshMap: false,
  dateInputInit: false,
}

export default initModel;