
import Form from '../Form';

type FormProps = {
    state: any;
    dispatch: React.Dispatch<any>;
};

const FormularioUI: React.FC<FormProps> = () => {
    

    return (
    <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
            <Form />
        </div>
    </section>
    );
};

export default FormularioUI;