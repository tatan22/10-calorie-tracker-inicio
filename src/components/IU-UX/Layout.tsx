import React, { useMemo } from 'react';

type LayoutProps = {
    state: any;
    dispatch: React.Dispatch<any>;
};

const Layout: React.FC<LayoutProps> = ({ state, dispatch }) => {
    const canRestartApp = useMemo(() => state.activities.length, [state.activities]);
    

    return (
        <header className="bg-lime-600 py-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-center text-lg font-bold text-white uppercase">
                    Contador de Calorias
                </h1>
                <button
                    className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
                    disabled={!canRestartApp}
                    onClick={() => dispatch({ type: 'restart-app' })}
                >
                    Reiniciar App
                </button>
            </div>
        </header>
    );
};

export default Layout;