import { Discord, SimpleCommand, SimpleCommandMessage } from "discordx";

@Discord()
class Simple {
    @SimpleCommand({ name: "notify" })
    async notify(command: SimpleCommandMessage) {
        await command.message.reply("test notify");
    }
}
