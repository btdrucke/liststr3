import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import App from './app/App'
import reportWebVitals from './reportWebVitals'
import store, {persistor} from "./app/store"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </DndProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()