
export const DESTINATIONS = [
  {
    id: "sweden",
    label: "Sweden",
    multiplier: 1.3
  },
  {
    id: "china",
    label: "China",
    multiplier: 4
  },
  {
    id: "brazil",
    label: "Brazil",
    multiplier: 8.6
  },
  {
    id: "australia",
    label: "Australia",
    multiplier: 7.2
  }
];


export const FIELD_DATA = {
  nameField: {
    id: "nameField",
    defaultValue: "",

  },
  weightField: {
    id: "weightField",
    defaultValue: 0
  },

  colorField: {
    id: "colorField",
    defaultValue: "#ffffff"
  },
  destinationField: {
    id: "destinationField",
    defaultValue: DESTINATIONS[0].id
  }
};
