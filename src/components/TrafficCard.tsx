import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getTrafficData } from "../api/actions";

const TrafficCard: React.FC = () => {
  const [data, setData] = useState<TrafficData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Traffic Data...");
    console.log(city);
    setLoadingState(true);
    getTrafficData(city)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="cityname"
              type="text"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.city}</h1>
            {data.Traffic > 20 ? (
              <div>
                <TiWeatherSunny className="w-36 h-36" />
              </div>
            ) : (
              <div>
                <TiWeatherDownpour className="w-36 h-36" />
              </div>
            )}
            <p className="text-3xl font-bold">{data.Traffic}°C</p>
            <p className="text-lg">rain: {data.rain}%</p>
            <p className="text-lg">wind: {data.wind} km/h</p>
            <p className="text-lg">sun: {data.sun} %</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a city</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrafficCard;
