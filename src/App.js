import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { AboutUs } from './components/AboutUs';
import { InsuranceFinder }from './components/Insurancefinder';
import { ProvidersCost } from './components/ProvidersCost';
import { Resources } from './components/Resources';
import { MedicalPriceTransparency } from './components/MedicalPriceTransparency';
import { NoMatch }  from './components/NoMatch';


import { styled, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ControlledAccordions from './ControlledAccordions'
import SelectDropDown from './SelectDropDown'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import AppBar  from './components/AppBar';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function App() {
  // const [provider, setProvider] = useState(null);
  // const [procedure, setProcedure] = useState(null);
  // const [providersList, setProvidersList] = useState([])
  // const [cost, setCost] = useState(null);
  // const [proceduresList, setProceduresList] = useState([])

  // const isSelected = (a, b) => {
  //   if (!a) return {};
  //   if (a.id === b.id) return { selected: "selected" };
  //   return {};
  // }


  // const resetApp = () => {
  //   setProvider(null);
  //   setProcedure(null);
  //   setCost(null);
  // }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  

  // const findProviderById = (id) => {
  //   return providersList.find((provider) => {
  //     return provider.id == id
  //   })
  // }
  // const providerChanged = (event) => {
  //   setProvider(findProviderById(event.target.value))
  // }

  // const findProcedureById = (id) => {
  //   return proceduresList.find((procedure) => {
  //     return procedure.id == id
  //   })
  // }
  // const procedureChanged = (event) => {
  //   setProcedure(findProcedureById(event.target.value))
  // }


  // const reloadProviders = useCallback(() => {
  //   axios.get("http://localhost:3008/providers")
  //     .then((response) => {
  //       setProvidersList(response.data)
  //     })
  // }, []);

  // const reloadProcedures = useCallback(() => {
  //   if (!provider) return;
  //   axios.get(`http://localhost:3008/providers/${provider.id}/procedures`)
  //     .then((response) => {
  //       setProceduresList(response.data)
  //     })
  // }, [provider]);

  // const reloadCost = useCallback(() => {
  //   if (!provider || !procedure) return;
  //   axios.get(`http://localhost:3008/providers/${provider.id}/procedures/${procedure.id}`)
  //     .then((response) => {
  //       setCost(response.data)
  //     })
  // }, [provider, procedure]);

  // useEffect(() => {
  //   reloadProviders()
  // }, [reloadProviders]);

  // useEffect(() => {
  //   reloadProcedures()
  // }, [reloadProcedures, provider]);

  // useEffect(() => {
  //   reloadCost()
  // }, [reloadCost, procedure]);

  const classes = useStyles();
  
  return (
    <div >
      
      <AppBar/>
      <Container className="background">

      </Container>
      <Container spacing={3}>
     
     
       
        <Grid item xs={12} className="center">
        <SelectDropDown />
        </Grid>
        {/* <Grid item xs={12}>
        <ControlledAccordions />
      </Grid> */}
      </Container>
    </div>
  );
}




