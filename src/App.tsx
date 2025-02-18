import { useEffect } from 'react'
import Form from "./components/Form"
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'
import { useActivity } from './hooks/useActivity'
import Layout from './components/IU-UX/Layout'


function App() {
    const {state, dispatch} =  useActivity();

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    
    return (
        <>
            <Layout state={state} dispatch={dispatch} />

            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form />
                </div>
            </section>

            <section className='bg-gray-800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <CalorieTracker 
                    />
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList/>
            </section>
        </>
    )
}

export default App
