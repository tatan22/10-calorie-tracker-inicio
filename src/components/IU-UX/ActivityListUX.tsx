import ActivityList from '../ActivityList'


type ActivityListProps = {
    state: any;
    dispatch: React.Dispatch<any>;
};

const  ActivityListUX: React.FC<ActivityListProps> = () => {
    

    return (
        <section className="p-10 mx-auto max-w-4xl">
            <ActivityList/>
        </section>
    );
};

export default ActivityListUX;