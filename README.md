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

For anything Warframe related whisper at **FrozenTear7** in-game.
