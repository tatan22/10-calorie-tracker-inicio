import { useEffect } from 'react'
import { useActivity } from './hooks/useActivity'
import Layout from './components/IU-UX/Layout'
import FormularioUI from './components/IU-UX/Formulario'
import ActivityListUI from './components/IU-UX/ActivityList';


function App() {
    const {state, dispatch} =  useActivity();

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    
    return (
        <>
            <Layout state={state} dispatch={dispatch} />
            <FormularioUI state={state} dispatch={dispatch} />
            <ActivityListUI  state={state} dispatch={dispatch}/>
        </>
    )
}

export default App
