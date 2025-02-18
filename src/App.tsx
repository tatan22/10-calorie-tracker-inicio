import { useEffect } from 'react'
import { useActivity } from './hooks/useActivity'
import Layout from './components/IU-UX/Layout'
import FormularioUX from './components/IU-UX/FormularioUX'
import ActivityListUX from './components/IU-UX/ActivityListUX';


function App() {
    const {state, dispatch} =  useActivity();

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    
    return (
        <>
            <Layout state={state} dispatch={dispatch} />
            <FormularioUX state={state} dispatch={dispatch} />
            <ActivityListUX  state={state} dispatch={dispatch}/>
        </>
    )
}

export default App
