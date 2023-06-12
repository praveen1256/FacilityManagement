# Developing a store for the application

1. Create a new folder with the module name in the store folder.
2. Create a new file with actions.ts name in the module folder.
3. Create a new file with reducer.ts name in the module folder.
4. Create a new file with actions.ts name in the module folder.
5. Create a new file with actionInterfaces.ts name in the module folder.


## Actions
This file basically contains the impure function, and each function can dispatch multiple actions to store so it reflects the current progress on the store.

## Reducer
This file contains the pure function, and each function can update the store based on the action dispatched by the actions file.

## Action Interfaces
This file contains the interfaces for the pure actions, and each interface is a type of action that can be dispatched by the actions file.


### Process of Adding new action to the store
1. Add a new action into the actions file.
2. Note down what states does this action reflect on teh store
3. Create ActionsTypes for each action states
4. Create the action interfaces for each actiontypes
4. add the cases into the reducer file