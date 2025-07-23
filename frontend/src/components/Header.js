import logo from './ns_pulsar2.png';


const Header = () => {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo"  data-tip="This is a neutron star logo" />
      <h1 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Neutron Star Radius Extractor
      </h1>
      <p style={{ color: '#ccc', fontSize: '1rem', marginBottom: '1.5rem' }}>
        Upload an EoS file from COMPOSE database and enter the Neutron Star mass for estimating the radius.
      </p>
    </>
  );
};

export default Header;
