import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './screen/HomeScreen';
import SinhVien from './screen/SinhVien';
import MonHoc from './screen/MonHoc';
import Hoc from './screen/Hoc';
import AddSV from './screen/AddSV';
import FromSV from './screen/FromSV';
import FromMH from './screen/FromMH';
import AddMH from './screen/AddMH';
import AddHOC from './screen/AddHOC';
import FromHOC from './screen/FromHOC';
import ActivityScreen from './screen/Activityscreen';
const AppNavigator = createStackNavigator({
    HomeScreen:{
        screen:HomeScreen
    },
    SinhVien:{
        screen:SinhVien
    },
    MonHoc:{
        screen:MonHoc
    },
    Hoc:{
        screen:Hoc
    },
    AddSV:{
        screen:AddSV
    },
    FromSV:{
        screen:FromSV
    },
    FromMH:{
        screen:FromMH
    },
    AddMH:{
        screen:AddMH
    },
    AddHOC:{
        screen:AddHOC
    },
    FromHOC:{
        screen:FromHOC
    },
    ActivityScreen:{
        screen:ActivityScreen
    }
});

export default createAppContainer(AppNavigator);