import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';

const AppComponent = ({Component, pageProps, currentUser}) => {
    return <div>
        <Header currentUser={currentUser}></Header>
        <div className='container'>
            <Component currentUser={currentUser} {...pageProps}/>
        </div>
    </div>;
};

AppComponent.getInitialProps = async ({Component, ctx}) => {
    const client = buildClient(ctx);
    const {data} = await client.get('/api/users/currentuser');
    let pageProps = {};
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data
    };
};

export default AppComponent;