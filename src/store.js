import { configureStore } from '@reduxjs/toolkit';
import selectedRepo from './redux/reducers/SelectedRepositories';
import searchResults from './redux/reducers/Results';
import savedRepos from './redux/reducers/SavedRepositories';

export default function CreateStore() {
    return configureStore({
      reducer: {
        selectedRepo,
        searchResults ,
        savedRepos,
      },
    });
  }
  