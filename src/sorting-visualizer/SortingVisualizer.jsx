import React from 'react';
import './SortingVisualizer.css';
import { Layout, Menu } from 'antd';
import { LaptopOutlined, ReloadOutlined, StepForwardOutlined } from '@ant-design/icons';
import { getMergeSortAnimations } from '../algorithms/sortingAlgorithms';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            sortingAlg: '',
            start: false
        };
    };

    componentDidMount() {
        this.resetArray();
    };

    resetArray() {
        const array = [];
        for (let i = 0; i < 230; i++) {
            array.push(randomIntFromInterval(5, 470));
        }

        console.log(array)
        this.setState({
            array
        });
    };

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    startSort() {
        if (this.state.sortingAlg === 'mergeSort') {
            this.mergeSort();
        } else {
            return false;
        }
    }

    render() {
        const { array } = this.state;

        return (
            <Layout>
                <Header className="header">
                    <h1 className='app-title'>Sorting Visualizer</h1>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Select Algorithm">
                                <Menu.Item key="5" onClick={() => {
                                    this.setState({
                                        sortingAlg: 'mergeSort',
                                        start: true
                                    })
                                }}>Merge Sort</Menu.Item>
                                <Menu.Item key="6">Bubble Sort</Menu.Item>
                                <Menu.Item key="7">Quick Sort</Menu.Item>
                                <Menu.Item key="8">Heap Sort</Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                icon={<ReloadOutlined />}
                                onClick={() => this.resetArray()}
                            >
                                Generate New Array
                            </Menu.Item>
                            <Menu.Item
                                icon={<StepForwardOutlined />}
                                onClick={() => this.startSort()}
                                disabled={!this.state.start}
                            >
                                Sort
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div className="array-container">
                                {array.map((value, idx) => (
                                    <div
                                        className="array-bar"
                                        key={idx}
                                        style={{ height: `${value}px` }}
                                    >
                                    </div>
                                ))}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}