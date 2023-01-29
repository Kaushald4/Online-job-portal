import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";

export interface ICountry {
    label: string;
    value: string;
    code: string;
}
export interface IState {
    label: string;
    value: string;
    countryCode: string;
    stateCode: string;
}
export interface ICity {
    label: string;
    value: string;
}

interface ILocation {
    country: ICountry;
    state: IState;
    city: string;
}

const useSelectLocation = () => {
    const [countries, setCountries] = useState<ICountry[]>();
    const [states, setStates] = useState<IState[]>();
    const [cities, setCities] = useState<ICity[]>();

    const [location, setLocation] = useState<ILocation>({
        city: "",
        country: { code: "", label: "", value: "" },
        state: { countryCode: "", label: "", stateCode: "", value: "" },
    });

    //initially fetch all countries
    useEffect(() => {
        let allCountries = Country.getAllCountries().map((country) => {
            return {
                label: country.name,
                value: country.name,
                code: country.isoCode,
            };
        });
        setCountries(allCountries);
    }, []);

    //fired when user selects country
    useEffect(() => {
        const allStates = State.getStatesOfCountry(location.country.code).map((state) => {
            return {
                label: state.name,
                value: state.name,
                countryCode: state.countryCode,
                stateCode: state.isoCode,
            };
        });
        setStates(allStates);
    }, [location.country]);

    //fired when user selects state
    useEffect(() => {
        const allCities = City.getCitiesOfState(
            location.state.countryCode,
            location.state.stateCode
        ).map((city) => {
            return {
                label: city.name,
                value: city.name,
            };
        });
        setCities(allCities);
    }, [location.state]);

    const handleLocationChange = (
        selectedLocation: ICountry | IState | ICity,
        locationType: "city" | "country" | "state"
    ) => {
        setLocation({ ...location, [locationType]: selectedLocation });
    };

    return { handleLocationChange, countries, states, cities };
};

export default useSelectLocation;
