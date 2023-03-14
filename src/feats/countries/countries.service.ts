import axios from 'axios'
import { Country } from '../../models'

export const getCountries = () => axios.get<Country[]>('https://restcountries.com/v2/all')