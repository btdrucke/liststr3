import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './app/app.css'
import './features/appMode/style.module.css'
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {PrimeReactProvider} from "primereact/api"
import App from './app/App'
import reportWebVitals from './reportWebVitals'
import store from "./app/store"
import {Provider} from "react-redux"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <PrimeReactProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </PrimeReactProvider>
        </DndProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()