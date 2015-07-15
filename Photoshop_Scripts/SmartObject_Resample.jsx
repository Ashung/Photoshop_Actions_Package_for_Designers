/* * SmartObject_Resample.jsx Wed Jul 15 2015 10:42:06 GMT+0800 * * Copyright (c) 2015 Ashung Hung (mailto:Ashung.hung@gmail.com) *  * Licensed under the Apache License, Version 2.0 (the "License"); * you may not use this file except in compliance with the License. * You may obtain a copy of the License at * *    http://www.apache.org/licenses/LICENSE-2.0 * * Unless required by applicable law or agreed to in writing, software * distributed under the License is distributed on an "AS IS" BASIS, * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. * See the License for the specific language governing permissions and * limitations under the License. * */(function(){    'use strict'    var orginalResampleMethod = app.preferences.interpolation;    var resampleMethods = [        ['Nearest Neighbor (preserve hard edges)', ResampleMethod.NEARESTNEIGHBOR],        ['Bilinear', ResampleMethod.BILINEAR],        ['Bicubic (best for smooth gradients)', ResampleMethod.BICUBIC],        ['Bicubic Smoother (best for enlargement)', ResampleMethod.BICUBICSMOOTHER],        ['Bicubic Sharper (best for reduction)', ResampleMethod.BICUBICSHARPER],        ['Bicubic Automatic', ResampleMethod.BICUBICAUTOMATIC]    ];    var ui = "dialog {\            text: 'SmartObject Resample',\            alignChildren: 'fill',\            resampleMethods: Group {\                orientation: 'column',\                alignChildren: 'left', \                label: StaticText { text: 'Smart Object Interpolation:' },\                list: DropDownList {\                    size: [260, 25] \                }\            },\            separator: Panel { preferredSize: [260, 0] },\            buttons: Group {\                orientation: 'row',\                cancelBtn: Button {\                    alignment: ['right', 'center'], \                    text: 'Cancel'\                },\                runBtn: Button {\                    alignment: ['right', 'center'], \                    text: 'OK'\                }\            }\        }";    var dialog = new Window(ui);    // Initialize resampleMethods DropDownList.    var list = dialog.resampleMethods.list;    for(var i = 0; i < resampleMethods.length; i ++) {        list.add('item', resampleMethods[i][0]);        if(resampleMethods[i][1] === orginalResampleMethod) {            list.selection = list.items[i];        }    }    // Button event.    dialog.buttons.runBtn.onClick = function() {        if(!documents.length)            return;        var resampleMethod = resampleMethods[list.selection.index][1];        app.preferences.interpolation = resampleMethod;        activeDocument.activeLayer.resize(100, 100, AnchorPosition.TOPLEFT);        app.preferences.interpolation = orginalResampleMethod;        app.refresh();    }    dialog.show();})();