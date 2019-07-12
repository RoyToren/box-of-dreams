# Box Of Dreams
This is the repository for the box of dreams web app.

**To contribute to the project, please contact RoyToren or Amit Hanoch for details**
  
###For developers:
> Note: Only the the Test branch should run with the config of the production environment.
- Running the code for quick development
    - Under the functions directory run: ``` npm run dev ```

- Running the code to inspect production before deploy
    - Under the client directory run: ``` npm run build ```
    - Under the root directory run: ``` firebase serve --only functions,hosting ```

- Deploy
    -  Under the root directory run: ``` firebase deploy ```