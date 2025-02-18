import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useActivity } from '../hooks/useActivity';

export default function ActivityList() {
    const { state, dispatch, isEmptyActivities, categoryName } = useActivity();

    return (
        <div className="max-w-2xl mx-auto p-5">
            <h2 className="text-4xl font-bold text-slate-600 text-center mb-5">
                Comida y Actividades
            </h2>
            
            {isEmptyActivities ? (
                <p className="text-center my-5 text-lg text-gray-500">No hay actividades aún...</p>
            ) : (
                state.activities.map(activity => (
                    <div 
                        key={activity.id} 
                        className="px-6 py-6 bg-white mt-5 flex justify-between items-center shadow-lg rounded-lg border border-gray-200 transition-transform transform hover:scale-105"
                    >
                        <div className="space-y-2 relative w-full">
                            <span 
                                className={`absolute -top-4 left-0 px-4 py-1 text-white text-sm uppercase font-bold rounded-md shadow-md 
                                ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}
                            >
                                {categoryName(+activity.category)}
                            </span>
                            <p className="text-2xl font-bold pt-5 text-gray-700">{activity.name}</p>
                            <p className="font-black text-3xl text-lime-500">
                                {activity.calories} <span className="text-gray-600 text-xl">Calorías</span>
                            </p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                                onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                            >
                                <PencilSquareIcon className="h-6 w-6 text-gray-800" />
                            </button>

                            <button
                                className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
                                onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                            >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}