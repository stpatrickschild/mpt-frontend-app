
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Grid } from '@material-ui/core';
import { GoogleMapsComponent } from './components/GoogleMaps'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectDropDown() {
  const classes = useStyles();
  const [state, setState] = React.useState({

  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const [provider, setProvider] = useState(null);
  const [procedure, setProcedure] = useState(null);
  const [providersList, setProvidersList] = useState([])
  const [cost, setCost] = useState(null);
  const [proceduresList, setProceduresList] = useState([])

  const isSelected = (a, b) => {
    if (!a) return {};
    if (a.id === b.id) return { selected: "selected" };
    return {};
  }


  const resetApp = () => {
    setProvider(null);
    setProcedure(null);
    setCost(null);
  }

  const findProviderById = (id) => {
    return providersList.find((provider) => {
      return provider.id == id
    })
  }
  const providerChanged = (event) => {
    setProvider(findProviderById(event.target.value))
  }

  const findProcedureById = (id) => {
    return proceduresList.find((procedure) => {
      return procedure.id == id
    })
  }
  const procedureChanged = (event) => {
    setProcedure(findProcedureById(event.target.value))
  }


  const reloadProviders = useCallback(() => {
    axios.get("http://localhost:3003/providers")
      .then((response) => {
        setProvidersList(response.data)
      })
  }, []);

  const reloadProcedures = useCallback(() => {
    if (!provider) return;
    axios.get(`http://localhost:3003/providers/${provider.id}/procedures`)
      .then((response) => {
        setProceduresList(response.data)
      })
  }, [provider]);

  const reloadCost = useCallback(() => {
    if (!provider || !procedure) return;
    axios.get(`http://localhost:3003/providers/${provider.id}/procedures/${procedure.id}`)
      .then((response) => {
        setCost(response.data)
      })
  }, [provider, procedure]);

  useEffect(() => {
    reloadProviders()
  }, [reloadProviders]);

  useEffect(() => {
    reloadProcedures()
  }, [reloadProcedures, provider]);

  useEffect(() => {
    reloadCost()
  }, [reloadCost, procedure]);

  // const classes = useStyles();


  return (

    <Grid container spacing={0} justify='center' alignItems='center'>

      <Grid item className='center' xs={12}>
        <FormControl className={classes.formControl} onChange={providerChanged}>
          <InputLabel htmlFor="uncontrolled-native">Provider</InputLabel>
          <NativeSelect
            defaultValue={""}
            inputProps={{
              name: 'Select your Provider',
              id: 'uncontrolled-native',
            }}

          >

            <option value=""></option>
            {providersList.map((p) => (
              <option key={p.id} value={p.id} {...isSelected(provider, p)}>{p.name}</option>
            ))}
          </NativeSelect>

          <FormHelperText>Select Your Provider</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item className='center' xs={12}>

        <FormControl className={classes.formControl} onChange={procedureChanged}>
          <InputLabel htmlFor="uncontrolled-native">Procedure</InputLabel>
          <NativeSelect
            defaultValue={""}
            inputProps={{
              name: 'Select your Procedure',
              id: 'uncontrolled-native',
            }}

          >
            <option value=""></option>
            {proceduresList.map((p) => (
              <option key={p.id} value={p.id} {...isSelected(procedure, p)}>{p.name}</option>
            ))}
          </NativeSelect>
          <FormHelperText>Select Your Procedure</FormHelperText>
        </FormControl>
      </Grid>

      <Grid container className='center' direction='column' xs={12}>
        <p>Selected Procedure: {procedure?.name}</p>

        {/* </Grid> */}
        {/* <Grid item className='center' xs={12}>> */}
        <p>In Network Cost: {cost?.in_network_cost}</p>

        {/* </Grid> */}
        {/* <Grid item className='center' xs={12}>> */}
        <p>Out of Network Cost: {cost?.out_of_network_cost}</p>

      </Grid>
      <Button className='resetButton' variant="contained" color="primary" onClick={resetApp}>Reset</Button>

    </Grid>
  );
}
