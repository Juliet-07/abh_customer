import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Label from "@component/form/Label";

const DropdownComponent = ({ onForm }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // State variables for dropdowns
  const [stateInputValue, setStateInputValue] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);

  // State variables for selected items
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);

  const handleStateInputChange = (value) => {
    setStateInputValue(value);
  };

  //   const handleStateChange = (selectedOption) => {
  //     console.log(selectedOption, "State Selected");
  //     setSelectedState(selectedOption.value);
  //     onForm(selectedOption, "Checking what is here");
  //   };

  const handleStateChange = (selectedOption) => {
    console.log(selectedOption, "State Selected");
    setSelectedState(selectedOption.value);
    onForm({
      state: selectedOption.value,
      city: null,
      cityName: null,
      town: null,
      townId: null,
    }); // Reset city, town, and townId on state change
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
    setSelectedCityName(selectedOption.label)
    onForm({
      state: selectedState,
      city: selectedOption.value,
      cityName: selectedOption.label,
      town: null,
      townId: null,
    }); // Reset town and townId on city change
  };

  const handleTownChange = (selectedOption) => {
    setSelectedTown(selectedOption.value);
    onForm({
      state: selectedState,
      city: selectedCity,
      cityName: selectedCityName,
      town: selectedOption.label,
      townId: selectedOption.value,
    }); // Send all selected values, including town ID
  };
  // Fetch all states on component mount
  useEffect(() => {
    let details;
    let statesInfo;
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${apiURL}/logistic/states`);
        console.log(response.data.data);
        details = response.data.data;
        statesInfo = details.map((state) => ({
          value: state.StateName,
          label: state.StateName,
        }));
        // console.log(statesInfo, "statesInfo");
        setStates(statesInfo);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `${apiURL}/logistic/state/cities?stateName=${selectedState}`
          );
          console.log(response.data.data, "Cities");
          const citiesInfo = response.data.data.map((city) => ({
            value: city.CityCode,
            label: city.CityName,
          }));
          console.log(citiesInfo, "cities");
          setCities(citiesInfo);
          setTowns([]); // Reset towns when a new state is selected
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [selectedState]);

  // Fetch towns when a city is selected
  useEffect(() => {
    if (selectedCity) {
      const fetchTowns = async () => {
        try {
          const response = await axios.get(
            `${apiURL}/logistic/delivery-towns?CityCode=${selectedCity}`
          );
          console.log(response.data.data, "Towns");
          const townsInfo = response.data.data.map((town) => ({
            value: town.TownID,
            label: town.TownName,
          }));
          setTowns(townsInfo);
        } catch (error) {
          console.error("Error fetching towns:", error);
        }
      };

      fetchTowns();
    }
  }, [selectedCity]);

  return (
    <div className="w-full flex items-center gap-4 mb-4">
      {/* Dropdown for states */}
      <div className="w-full col-span-6 sm:col-span-6 lg:col-span-2">
        <Label label="State" />
        <Select
          options={states}
          // defaultValue={selectedState}
          onInputChange={handleStateInputChange}
          onChange={handleStateChange}
          placeholder="Select State"
        />
      </div>
      {/* Dropdown for cities */}
      {selectedState && (
        <div className="w-full col-span-6 sm:col-span-6 lg:col-span-2">
          <Label label="City" />
          <Select
            options={cities}
            onChange={handleCityChange}
            placeholder="Select City"
          />
        </div>
      )}

      {/* Dropdown for towns */}
      {selectedCity && (
        <div className="w-full col-span-6 sm:col-span-6 lg:col-span-2">
          <Label label="Town" />
          <Select
            options={towns}
            onChange={handleTownChange}
            placeholder="Select Town"
          />
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
