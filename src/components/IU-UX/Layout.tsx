import React, { useMemo } from 'react';

type LayoutProps = {
    state: any;
    dispatch: React.Dispatch<any>;
};

const Layout: React.FC<LayoutProps> = ({ state, dispatch }) => {
    const canRestartApp = useMemo(() => state.activities.length, [state.activities]);

    return (
        <header className="bg-lime-600 py-4 shadow-md">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                <h1 className="text-center text-2xl font-extrabold text-white uppercase tracking-wider">
                    Contador de Calorías
                </h1>
                <button
                    className="mt-3 md:mt-0 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-5 rounded-lg 
                            transition-all duration-300 transform hover:scale-105 
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!canRestartApp}
                    onClick={() => dispatch({ type: 'restart-app' })}
                >
                    🔄 Reiniciar App
                </button>
            </div>
        </header>
    );
};

export default Layout;
