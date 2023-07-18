import { useEffect, useState } from 'react';
import { DateSort } from '../models/dateSort';
import { Launch } from '../models/launch';
import { launchesAPI } from '../services/LaunchesService';
import { rocketsAPI } from '../services/RocketsService';
import './app.css';

function App() {
    const [sort, setSort] = useState(DateSort.Descending);
    const { data: launches, isLoading: isLoadingLaunches, refetch: refetchLaunches } = launchesAPI.useFetchLaunchesByCustomBodyQuery(sort);
    const { data: rockets, isLoading: isLoadingRockets, refetch: refetchRockets } = rocketsAPI.useFetchAllRocketsQuery({});

    function changeSort() {
        setSort(sort == DateSort.Descending ? DateSort.Ascending : DateSort.Descending);
    }

    useEffect(() => {
        refetchLaunches();
        refetchRockets();
    }, [sort]);

    function renderLaunch(launch: Launch) {
        const rocket = rockets?.find(r => r.id == launch.rocketId);

        return (
            <div className="flex_container" key={launch.id}>
                <img className="image_rocket" src={rocket?.flickr_images[0]} />
                <div className="launch">
                    <div className="launch_number">
                        Launch #{launch.flight_number} ({rocket?.name})
                        {launch.success
                            ?
                            <div className="status successfully">Успешно</div>
                            :
                            <div className="status unsuccessfully">Не успешно</div>}
                    </div>
                    <div>Name: {launch.name}</div>
                    <div>{launch.details}</div>
                    <div className='launch_date'>{launch.date_utc.toLocaleDateString()}</div>

                </div>
            </div>
        )
    }

    return (
        <div>
            <button className='changer' onClick={changeSort}>CHANGE SORT</button>

            {
                isLoadingLaunches ?
                    'Загрузка...'
                    :
                    <>
                        {launches?.map(renderLaunch)}
                    </>
            }
        </div>
    );
}

export default App;