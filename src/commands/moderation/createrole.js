const { Command, SwitchbladeEmbed, Constants, Color } = require('../../')

module.exports = class CreateRole extends Command {
  constructor (client) {
    super(client, {
      name: 'createrole',
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['MANAGE_ROLES'], permissions: ['MANAGE_ROLES'] },
      parameters: [
        { type: 'color', required: false },
        { type: 'string', full: true, missingError: 'commands:createrole.noParams', required: true }
      ]
    })
  }

  async run ({ channel, guild, author, t }, color = new Color('#ffffff'), name) {
    const hexcode = color.rgb(true)
    const embed = new SwitchbladeEmbed(author)

    try {
      await guild.createRole({ name, color: hexcode })
      embed
        .setTitle(t('commands:createrole.successTitle'))
        .setDescription(t('commands:createrole.successMessage', { name }))
        .setColor(hexcode)
    } catch (err) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:createrole.errorTitle'))
        .setDescription(`\`${err}\``)
    }

    channel.send(embed)
  }
}
