import { FaFlag } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaCloudShowersWater } from "react-icons/fa6";
import { FaPlaneDeparture } from "react-icons/fa";
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
import { getGameData } from "../api/actions";

const GameCard: React.FC = () => {
    const [data, setData] = useState<gameData>();
    const [loadingState, setLoadingState] = useState(false);
    const [UserNumber, SetUserNumber] = useState<number>(0);
    const [error, setError] = useState("");
    const [anser, setAnser] = useState("");
    
  
    const handleSearch = () => {
      console.log("Fetching Traffic Data...");
      console.log(UserNumber);
      setLoadingState(true);
      getGameData(UserNumber)
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
                id="enterUserNumber"
                type="number"
                label="UserNumber"
                value={UserNumber}
                onChange={(e) => {
                    SetUserNumber(e.target.value);
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
              <h1 className="text-3xl font-bold">guess the icon</h1>
              
                <div>
                  {data.icon}
                </div>
            </div>
          </CardBody>
          ) : (
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">Please enter a level number</p>
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
  
  export default GameCard;