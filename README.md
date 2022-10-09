# SisGEO

[SisGEO](https://sisgeo.unifal-mg.edu.br) is a WebGIS based on TerraBrasilis [webmap](https://github.com/terrabrasilis/webmap) and modified by students at [Universidade Federal de Alfenas](https://www.unifal-mg.edu.br/) to provide access of geoespatial data produced by Geodynamics of Watersheds Research Group. Most data are captured from Furnas watershed.

## Prerequisites

### Installing and configuring dependencies

You will need to install npm for managing package dependencies

```bash
sudo apt-get install npm
```

The project also needs Geoserver for retrieving geospacial data that will be showed on web and [Business Api](https://github.com/Geografia-Unifal-MG/sisgeo-business-api) to retrieve configuration about which layers will be used on the project.
We  recommend the use of [Docker Engine](https://www.docker.com/) to manage and deploy all dependencies. These are the containers used:

* [Geoserver](https://hub.docker.com/r/terrabrasilis/geoserver)
* [Business Api](https://hub.docker.com/r/terrabrasilis/business-api)

### Configuring Business Api

Make sure the Business Api right url is defined at `src/app/util/constants.ts`.

Visions are the sidebar sections where layers are placed. Their names and id's, as well as layer names and id's are defined at translate files `src/assets/i18n/pt-br.json` and `src/assets/i18n/en.json`. On these files, vision id's are placed in the original form, just the id. However, layer id's definition is the concatenation of its respective vision id with the own layer id. Exemple:

The vision and layer definition on the .json file for a layer with id `5e49d55c5201df00013b98de` and vision id `5e402b11c98e9f0001a6b1cd` will be

```json
"5e402b11c98e9f0001a6b1cd" : {
    "name": "Vision Name",
    "5e402b11c98e9f0001a6b1cd5e49d55c5201df00013b98de" : "Layer Name"
}
```

## Build

Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Install and select the ```14.16.0``` node version

```bash
nvm install 14.16.0
npm use 14.16.0
```

For installing dependencies defined at package.json, run the following command

```bash
npm install
```

In some cases you will get an error from npm, so run

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
npm install
```

Run the following command to build the project:

```bash
npm run start
```

## Build a Docker Image

Run `./build.sh` to build into a docker image. You can specify the image version and the build environment as parameters, in this order.

## Authors

* **INPE Team** - *Original code* - [Terrabrasilis](https://github.com/terrabrasilis)
* **Sylvester Henrique** - *Computer Science student* - [SylvesterH13](https://github.com/SylvesterH13)
* **Guilherme Vieira** - *Computer Science student* - [gu1lh3rme](https://github.com/gu1lh3rme)
