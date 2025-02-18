import { useEffect } from 'react'
import ActivityList from './components/ActivityList'
import { useActivity } from './hooks/useActivity'
import Layout from './components/IU-UX/Layout'
import FormularioUI from './components/IU-UX/Formulario'


function App() {
    const {state, dispatch} =  useActivity();

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    
    return (
        <>
            <Layout state={state} dispatch={dispatch} />
            <FormularioUI state={state} dispatch={dispatch} />

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList/>
            </section>
        </>
    )
}

export default App
