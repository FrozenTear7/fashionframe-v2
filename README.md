# Fashionframe - backend

[![CI](https://github.com/FrozenTear7/fashionframe-backend/actions/workflows/CI.yml/badge.svg?branch=master)](https://github.com/FrozenTear7/fashionframe-backend/actions/workflows/CI.yml)

![Coverage - statements](./badges/badge-statements.svg)
![Coverage - branches](./badges/badge-branches.svg)
![Coverage - functions](./badges/badge-functions.svg)
![Coverage - lines](./badges/badge-lines.svg)

This is a server for the [Fashionframe](https://github.com/FrozenTear7/fashionframe-frontend) web application, check out its repository to find out more about the app.

---

## Warframe data

The server provides endpoints with Warframe data taken from [Warframe Wiki](https://warframe.fandom.com/wiki/WARFRAME_Wiki) such as Frames, Attachments, Syandanas, Color pickers, etc. put into _.json_ files.

I do not own this data, I simply made it into a better format for the sake of this project, please refer to the wiki for the source.

Served data might also be outdated, since it has to be updated manually

## API

All data is being served as _.json_, where specific data is put into a json object as:

```javascript
{
    "<data_name>": [
        "Record1",
        "Record2",
        ...
    ]
}
```

The exception are the Color Pickers where the Json data looks like:

```javascript
{
  "colorPickers": {
    "Agony": [
      "#676767",
      "#6f6f6f",
      ...
    ],
    ...
  }
}
```

| Endpoint              | Data                                                                        |
| --------------------- | --------------------------------------------------------------------------- |
| /api/frames           | [Frames](https://fashionframe.herokuapp.com/api/frames)                     |
| /api/ephemeras        | [Ephemeras](https://fashionframe.herokuapp.com/api/ephemeras)               |
| /api/helmets          | [Helmets](https://fashionframe.herokuapp.com/api/helmets)                   |
| /api/skins            | [Skins](https://fashionframe.herokuapp.com/api/skins)                       |
| /api/colorPickers     | [ColorPickers](https://fashionframe.herokuapp.com/api/colorPickers)         |
| /api/chestAttachments | [ChestAttachments](https://fashionframe.herokuapp.com/api/chestAttachments) |
| /api/armAttachments   | [ArmAttachments](https://fashionframe.herokuapp.com/api/armAttachments)     |
| /api/legAttachments   | [LegAttachments](https://fashionframe.herokuapp.com/api/legAttachments)     |
| /api/syandanas        | [Syandanas](https://fashionframe.herokuapp.com/api/syandanas)               |

## License

The project is open source under MIT license, feel free to do anything with the code, the app was not made for profit, merely as a cool tool for the community and polishing own programming skills.

###### Fashionframe isn’t endorsed by Digital Extremes and doesn’t reflect the views or opinions of Digital Extremes or anyone officially involved in producing or managing Warframe. Warframe and Digital Extremes are trademarks or registered trademarks of Digital Extremes ©.

Created and maintaned by: [FrozenTear7](https://github.com/FrozenTear7) - pawelmendroch7@gmail.com

Thanks to [Arcustangens](https://github.com/arcustangens) for helping with Color Pickers data.

For anything Warframe related whisper **@FrozenTear7** in-game.
