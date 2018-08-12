export const DB_INITIALISE = 'DB_INITIALISE';

export function initialiseDB() {
    return {
        type: DB_INITIALISE,
        payload: {
            brands: [
                {
                    active: true,
                    name: "7-Eleven",
                    order: 0
                },
                {
                    active: true,
                    name: "BP",
                    order: 1
                },
                {
                    active: true,
                    name: "Budget",
                    order: 2
                },
                {
                    active: true,
                    name: "Caltex",
                    order: 3
                },
                {
                    active: true,
                    name: "Caltex Woolworths",
                    order: 4
                },
                {
                    active: true,
                    name: "Coles Express",
                    order: 5
                },
                {
                    active: true,
                    name: "Costco",
                    order: 6
                },
                {
                    active: true,
                    name: "Enhance",
                    order: 7
                },
                {
                    active: true,
                    name: "Independent",
                    order: 8
                },
                {
                    active: true,
                    name: "Inland Petroleum",
                    order: 9
                },
                {
                    active: true,
                    name: "Liberty",
                    order: 10
                },
                {
                    active: true,
                    name: "Lowes",
                    order: 11
                },
                {
                    active: true,
                    name: "Matilda",
                    order: 12
                },
                {
                    active: true,
                    name: "Metro Fuel",
                    order: 13
                },
                {
                    active: true,
                    name: "Mobil",
                    order: 14
                },
                {
                    active: true,
                    name: "Prime Petroleum",
                    order: 15
                },
                {
                    active: true,
                    name: "Puma Energy",
                    order: 16
                },
                {
                    active: true,
                    name: "Shell",
                    order: 17
                },
                {
                    active: true,
                    name: "Speedway",
                    order: 18
                },
                {
                    active: true,
                    name: "Tesla",
                    order: 19
                },
                {
                    active: true,
                    name: "United",
                    order: 20
                },
                {
                    active: true,
                    name: "Westside",
                    order: 21
                }
            ],
            fueltypes: [
                {
                    active: true,
                    code: "B20",
                    name: "Biodiesel 20",
                    order: 7
                },
                {
                    active: true,
                    code: "CNG",
                    name: "CNG/NGV",
                    order: 9

                },
                {
                    active: true,
                    code: "DL",
                    name: "Diesel",
                    order: 5

                },
                {
                    active: true,
                    code: "E10",
                    name: "Ethanol 94",
                    order: 0

                },
                {
                    active: true,
                    code: "E85",
                    name: "Ethanol 105",
                    order: 2

                },
                {
                    active: true,
                    code: "EV",
                    name: "EV charge",
                    order: 10

                },
                {
                    active: true,
                    code: "LPG",
                    name: "LPG",
                    order: 8

                },
                {
                    active: true,
                    code: "P95",
                    name: "Premium 95",
                    order: 3

                },
                {
                    active: true,
                    code: "P98",
                    name: "Premium 98",
                    order: 4

                },
                {
                    active: true,
                    code: "PDL",
                    name: "Premium Diesel",
                    order: 6

                },
                {
                    active: true,
                    code: "U91",
                    name: "Unleaded 91",
                    order: 1
                }
            ]
        }
    };
};