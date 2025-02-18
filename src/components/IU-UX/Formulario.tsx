import React from 'react'
import Form from "./components/Form"


type Props = {}

const Formulario = (props: Props) => {
    return (
        <section className="bg-lime-500 py-20 px-5">
            <div className="max-w-4xl mx-auto">
                <Form />
            </div>
        </section>
    )
}
export default Formulario;