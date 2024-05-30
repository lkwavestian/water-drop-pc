import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_CONFIG } from './routes';
import Page404 from './containers/Page404';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                {ROUTE_CONFIG.map((item) => (
                    <Route path={item.path} element={<item.element />} key={item.key} />
                ))}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    </ApolloProvider>
);
