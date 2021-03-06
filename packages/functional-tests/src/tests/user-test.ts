/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import { Test } from '../test';

export default class UserTest extends Test {
	public expectedResultDescription = "Lists user info";
	public async run(root: MRE.Actor): Promise<boolean> {
		const labelText = 'Launched by User Named: ' + this.user.name +
			'\nUser ID: ' + this.user.id +
			"\nPermissions: " + this.user.grantedPermissions.join(", ") +
			"\nProperties: " + this.formatProperties(this.user.properties) +
			"\nTotal Connected Users:" + this.app.context.users.length;

		MRE.Actor.Create(this.app.context, {
			actor: {
				parentId: root.id,
				transform: {
					local: {
						position: { x: 0, y: 1, z: 0 }
					}
				},
				text: {
					contents: labelText,
					height: 0.1,
					anchor: MRE.TextAnchorLocation.MiddleCenter
				}
			}
		});

		await this.stoppedAsync();
		return true;
	}

	private formatProperties(props: { [key: string]: string }): string {
		let output = "";
		for (const k in props) {
			if (Object.prototype.hasOwnProperty.call(props, k)) {
				output += `\n   ${k}: ${props[k]}`;
			}
		}
		return output;
	}
}
