import { ENGINE_METHOD_ALL } from "constants";

export const activityTypeOptions = [
  { 
    label: 'All', 
    value : '.'
  }, 
  {
    label: 'New',
    value: 'NEW'
  },
  {
    label: 'Alterations',
    value: '^ALT$'
  },
  {
    label: 'Interior Alterations',
    value: 'I_ALT'
  },
  {
    label: 'Addition',
    value: 'ADD'
  },
  {
    label: 'Repair',
    value: 'RP'
  },
  {
    label: 'Other',
    value: 'OT'
  },
  {
    label: 'Demolition',
    value: 'DEM'
  },
  {
    label: 'Residential Deck',
    value: 'R_DECK'
  },
  {
    label: 'Minimum Housing',
    value: 'MN'
  }
];

export const bldgTypeOptions = [
  {
    label: 'All',
    value: '.'
  },
  {
    label: 'All residential',
    value: '((5\\+ Residential Units)|(Duplex)|(Single Family House)|(Townhouse)|(Accessory Dwelling)|(3-4 Residential Units)|(Mobile Home))'
  },
  {
    label: '5+ Residential Units',
    value: '5\\+ Residential Units'
  },
  {
    label: 'Quadplex',
    value: '3-4 Residential Units'
  },
  {
    label: 'Duplex',
    value: 'Duplex'
  },
  {
    label: 'Townhouse',
    value: 'Townhouse'
  },
  {
    label: 'Single Family House',
    value: 'Single Family House'
  },
  {
    label: 'Accessory Dwelling',
    value: 'Accessory Dwelling'
  },
  {
    label: 'Mobile Home',
    value: 'Mobile Home'
  }
];

export const pmtStatusOptions = [
  {
    label: 'All',
    value: '.'
  },
  {
    label: 'CO Issued',
    value: 'CO Issued'
  },
  {
    label: 'Void',
    value: 'Void'
  },
  {
    label: 'Issued',
    value: '^Issued$'
  },
  {
    label: 'Cond. CO Issued',
    value: 'Cond\\. CO Issued'
  },
  {
    label: 'Complete',
    value: 'Complete'
  },
  {
    label: 'CO Pending',
    value: 'CO Pending'
  },
  {
    label: 'On Hold',
    value: 'On Hold'
  }
]