# Fashionframe

[![CI & CD](https://github.com/FrozenTear7/fashionframe-v2/actions/workflows/CI&CD.yml/badge.svg?branch=master)](https://github.com/FrozenTear7/fashionframe-v2/actions/workflows/CI&CD.yml)

### What is Fashionframe?

Fashionframe is what Warframe players call _"The true endgame"_, which is modifying your frames, operator and other parts with different skins, colors, that look the best in your own eye.

Many modifications are being given out by the developers during events or alerts, so make sure to watch out for that, you can also buy specific ones from **Baro Ki'Teer** or simply spend platinum in the market.

---

Fashionframe is a social hub for Warframe players, where they can share their fashion setups and use those, created by others.

These fashion setups include attachments, syandanas, colors and skins for all available frames in the game.

_(Operators, railjacks, companions and others will be added in the future)_

### Recommended sites for your own fashionframe

[Coolors](https://coolors.co/) - website that helps generate color schemes, that you can use for your setups

[Polychrome](https://polychrome.seldszar.fr/) - website with all current color schemes in the game, that helps you find the closest color in each pallet

Personally I pick a leading color for the biggest part of the frame, then put that color in Coolors and lock it.
The rest of the colors (3 of the 4) will be generated randomly and make a whole color scheme. I simply reroll it until I find something fitting, then put the RGB colors into Polychrome and find which closest colors I own in the form of pallets. Then I simply use those colors on the rest of the parts pick fitting attachments and v'oila.

## Warframe data

The app also provides endpoints with Warframe data taken from [Warframe Wiki](https://warframe.fandom.com/wiki/WARFRAME_Wiki) such as Frames, Attachments, Syandanas, Color pickers, etc. put into _.json_ files.

## API

Color pickers, helmets and skins data is served as a **json** object with items group by the shared type:

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

```javascript
{
  "helmets": {
    "Ash": [
      "Ash Helmet",
      "Ash Prime Helmet",
      ...
    ],
    ...
  }
}
```

```javascript
{
  "skins": {
    "Ash": [
      "Ash Skin",
      "Ash Koga Skin",
      ...
    ],
    ...
  }
}
```

The rest of the data is served as a simple **json** array of values:

```javascript
{
    "<data_name>": [
        "Record1",
        "Record2",
        ...
    ]
}
```

| Endpoint                   | Data                                                                             |
| -------------------------- | -------------------------------------------------------------------------------- |
| /api/data/frames           | [Frames](https://fashionframe.herokuapp.com/api/data/frames)                     |
| /api/data/ephemeras        | [Ephemeras](https://fashionframe.herokuapp.com/api/data/ephemeras)               |
| /api/data/helmets          | [Helmets](https://fashionframe.herokuapp.com/api/data/helmets)                   |
| /api/data/skins            | [Skins](https://fashionframe.herokuapp.com/api/data/skins)                       |
| /api/data/colorPickers     | [ColorPickers](https://fashionframe.herokuapp.com/api/data/colorPickers)         |
| /api/data/chestAttachments | [ChestAttachments](https://fashionframe.herokuapp.com/api/data/chestAttachments) |
| /api/data/armAttachments   | [ArmAttachments](https://fashionframe.herokuapp.com/api/data/armAttachments)     |
| /api/data/legAttachments   | [LegAttachments](https://fashionframe.herokuapp.com/api/data/legAttachments)     |
| /api/data/syandanas        | [Syandanas](https://fashionframe.herokuapp.com/api/data/syandanas)               |

## License

The project is open source under MIT license, feel free to do anything with the code, the app was not made for profit, merely as a cool tool for the community and polishing own programming skills.

###### Fashionframe isn’t endorsed by Digital Extremes and doesn’t reflect the views or opinions of Digital Extremes or anyone officially involved in producing or managing Warframe. Warframe and Digital Extremes are trademarks or registered trademarks of Digital Extremes ©.

Created and maintaned by: [FrozenTear7](https://github.com/FrozenTear7) - pawelmendroch7@gmail.com

Thanks to [Arcustangens](https://github.com/arcustangens) for helping with Color Pickers data.

For anything Warframe related whisper at **FrozenTear7** in-game.
