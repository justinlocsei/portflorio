# Portflorio

[Portflorio](https://portflor.io) is a portfolio for the flower arrangements that I make and photograph as a hobby.  Here are the details:

* A high-quality preview and full-size image exported from Lightroom Classic are stored in directories under `arrangements/`.
* [Larkspur](https://github.com/justinlocsei/larkspur) defines a set of `portflorio` management tasks for adding photos and driving development and deployment.
* A React-based SPA, with component styles defined using [Ruscus](https://github.com/justinlocsei/ruscus), displays the arrangements.
* Vite builds pre-rendered HTML and hashed assets that are deployed using a static Cloudflare worker.

## Development

To work on Portflorio, use the following commands:

```sh
# Add an arrangement using the ID of the exported Lightroom images
portflorio arrangements add --id <id> --mechanic <mechanic>

# Produce a short description of a given arrangement for posting on social media
portflorio arrangements share --id <id>

# Check for formatting and linting errors
portflorio check

# Generate TSX and style files for a PascalCase named component
portflorio components generate --name <name>

# Format code
portflorio format

# Run unit tests
portflorio test

# Start a development server
portflorio site develop

# Deploy the site
portflorio site deploy
```
