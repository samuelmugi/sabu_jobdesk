import React, {Component} from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Box, Button, Typography, withStyles} from '@material-ui/core';
import BackendService from "services/APiCalls/BackendService";
import {Divider, Feed, Grid, GridColumn, GridRow, Icon} from "semantic-ui-react";
import REST_APIS from "services/APiCalls/config/apiUrl";
import STORAGE from "services/APiCalls/config/storage";
import download from 'downloadjs'
import moment from "moment";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const user = STORAGE.getCurrentUser()?.jobApplicantProfileViewModel;

export default class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            isError: false,
            fileInfos: [],
        };
    }

    componentDidMount() {
        BackendService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        BackendService.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                this.setState({
                    message: response.data.message,
                    isError: false
                });
                return BackendService.getFiles();
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch(() => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the file!",
                    currentFile: undefined,
                    isError: true
                });
            });

        this.setState({
            selectedFiles: undefined,
        });
    }

    download(e) {
        e.preventDefault();
        const url = REST_APIS.DOWNLOAD_CV.replace('PROFILEID', user.id)
        BackendService.DwonloadRequest(url)
            .then((response) => {
                const content = response.headers['application/octetstream'];
                download(new Blob([response.data], {type: "application/octetstream"}), user?.firstName + '_CV.pdf', content)

            });
    }


    render() {
        const {
            selectedFiles,
            currentFile,
            progress
        } = this.state;

        return (
            <div className="mg20">
                {currentFile && (
                    <Box className="mb25" display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <BorderLinearProgress variant="determinate" value={progress}/>
                        </Box>
                        <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                        </Box>
                    </Box>)
                }

                <Grid stackable>
                    <GridRow>
                        <GridColumn>
                            <label htmlFor="btn-upload">
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{display: 'none'}}
                                    type="file"
                                    onChange={this.selectFile}/>
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    component="span">
                                    Choose Resume File
                                </Button>
                            </label>
                            <div className="file-name">
                                {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
                            </div>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                disabled={!selectedFiles}
                                onClick={this.upload}>
                                Upload
                            </Button>


                        </GridColumn>
                    </GridRow>
                    {user?.curriculumVitaeName && <GridRow>
                        <GridColumn>

                            Download &nbsp;
                            <a
                                className="text-warning"
                                href="#latestcv"
                                onClick={this.download}
                            >
                                {user?.curriculumVitaeName}
                            </a> &nbsp;uploaded {moment(user?.curriculumVitaeUploadDate).format("MMM Do YYYY")}
                        </GridColumn>
                    </GridRow>}
                    {
                        !user?.curriculumVitaeName &&
                        <GridRow>
                            <GridColumn>
                                <Feed>
                                    <Feed.Event
                                        date='Today'
                                        summary="You have not uploaded CV yet."
                                    ><Icon name='comment'/>
                                    </Feed.Event>

                                </Feed>
                            </GridColumn>
                        </GridRow>
                    }
                </Grid>
                <Divider/>
            </div>
        );
    }
}