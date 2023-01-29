import Select from "react-select";
import useSelectLocation from "../hooks/useLocation";

interface Props {
    handleOrginazationLocation: (
        location: string,
        locationType: "country" | "state" | "city"
    ) => void;
    disabled?: boolean;
}

const LocationPicker = ({ handleOrginazationLocation, disabled }: Props) => {
    const { countries, handleLocationChange, states, cities } = useSelectLocation();
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="w-full">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    Country
                </label>
                <Select
                    isDisabled={disabled}
                    onChange={(e) => {
                        handleLocationChange(e!!, "country");
                        handleOrginazationLocation(e!!.label, "country");
                    }}
                    options={countries}
                    className="w-full"
                />
            </div>

            <div className="w-full">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    State
                </label>
                <Select
                    isDisabled={disabled}
                    onChange={(e) => {
                        handleLocationChange(e!!, "state");
                        handleOrginazationLocation(e!!.label, "state");
                    }}
                    className="w-full"
                    options={states}
                />
            </div>
            <div className="w-full">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    City
                </label>
                <Select
                    isDisabled={disabled}
                    onChange={(e) => {
                        handleLocationChange(e!!, "city");
                        handleOrginazationLocation(e!!.label, "city");
                    }}
                    className="w-full"
                    options={cities}
                />
            </div>
        </div>
    );
};

export default LocationPicker;
