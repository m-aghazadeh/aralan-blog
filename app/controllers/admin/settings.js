const settingsModel = require('../../models/settings');
const definedSettings = require('../../config/settings')
exports.index = async (req, res) => {
    const settings = await settingsModel.findAll();
    const presentedSettings = {};
    settings.forEach(item => {
        presentedSettings[item.setting_name] = item.setting_value;
    });
    res.adminRender('admin/settings/index', {
        config: presentedSettings, helpers: {
            isChecked: function (value, options) {
                return parseInt(value) === 1 ? options.fn(this) : options.inverse(this);
            },
        }
    });
}

exports.store = async (req, res) => {

    const settings = req.body;

    const permitedSettingsKeys = Object.keys(settings).filter(setting => {
        return Object.keys(definedSettings).includes(setting);
    });
    const permitedSettings = {};
    permitedSettingsKeys.forEach(key => {
        permitedSettings[key] = settings[key];
    })
    const validatedSettings = {...definedSettings, ...permitedSettings};

    await settingsModel.update(validatedSettings);
    res.redirect('/admin/settings');
}
