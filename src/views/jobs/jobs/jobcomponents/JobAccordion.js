import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {grey} from '@material-ui/core/colors';
import {Badge} from 'reactstrap';
import {Button, Divider, Header, List} from 'semantic-ui-react'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    headingAvatar: {
        fontSize: theme.typography.pxToRem(13),
        fontWeight: theme.typography.fontWeightBold,
        flexBasis: '10%',
        flexShrink: 0,
    },
    headingCompany: {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightBold,
        flexBasis: '20%',
        flexShrink: 0,
    },
    headingJOb: {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightBold,
        flexBasis: '40%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
        flexBasis: '12%',
        flexShrink: 0,

    },
    avatar: {
        backgroundColor: grey[500],
    },
}));

const JobAccordion = () => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {[...Array(10).keys()].map((item) => {
                return (
                    <>
                        <Accordion expanded={expanded === 'panel1' + item} onChange={handleChange('panel1' + item)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.headingAvatar}>
                                    <Avatar alt="Remy Sharp" src={require('assets/img/icons8-work.png')}
                                            className={classes.avatar}>
                                    </Avatar>
                                </Typography>
                                <Typography className={classes.headingCompany}><h5 className="title text-warning">
                                    Telkom Kenya
                                </h5></Typography>
                                <Typography className={classes.headingJOb}>Radio Planning And Optimization
                                    Engineer
                                </Typography>

                                <Typography className={classes.secondaryHeading}>
                                    <div>
                                        <Badge color="primary" pill className="mr-1">
                                            Nairobi,Kenya
                                        </Badge>
                                        <Badge color="primary" pill className="mr-1">
                                            Full-time
                                        </Badge>

                                    </div>
                                </Typography>
                                <Typography className={classes.secondaryHeading}>Closing: Jun 18, 2021</Typography>

                            </AccordionSummary>
                            <Divider/>
                            <AccordionDetails>
                                <Box width={'100%'}>
                                    <Typography>
                                        <Button.Group>
                                            <Button size='mini' positive>Apply</Button>
                                            <Button.Or/>
                                            <Button size='mini'>Save</Button>
                                        </Button.Group>
                                    </Typography>
                                    <Header as='h3'>Job Requirements</Header>
                                    <Typography paragraph>
                                        <List>
                                            <List.Item>
                                                <List.Header>Education:</List.Header>Bachelor's degree
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Work experience:</List.Header>
                                                3 years
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Language skills:</List.Header>
                                                English
                                            </List.Item>
                                        </List>
                                    </Typography>
                                    <Header as='h3'>Job Summary</Header>
                                    <Typography paragraph>
                                        <Header as='h5'>Who We Are</Header>

                                        Telkom is a technology company that provides integrated solutions to
                                        individuals, Small and Medium-sized Enterprises (SMEs), Government and large
                                        corporates in Kenya, drawing from a diverse solutions suite that includes voice,
                                        data/connectivity, digital financial services, as well as network services.
                                        Powered by its vast fibre optic infrastructure, it is also a major provider of
                                        wholesale carrier-to-carrier traffic, within the country and the region.


                                        <Header as='h5'>Role Purpose:</Header>

                                        Responsible for planning and optimization of GSM, UMTS, LTE .The role holder is
                                        responsible for overseeing the design, deployment, and optimization of wireless
                                        telecommunications networks. Managing the design phase will include overseeing
                                        pre-deployment equipment analysis, technology assessment, radio network
                                        planning, access planning, and interference analysis, demand planning, test and
                                        measurement of the equipment, and interfacing with the market development team.
                                        In the optimization stage, main tasks are to supervise optimal network
                                        performance, KPI and network statistics analysis, and parameter optimization.
                                    </Typography>
                                    <Header as='h3'>Key Duties and Responsibilities</Header>
                                    <Typography paragraph>
                                        <List as='ol'>
                                            <List.Item as='li' value='*'>
                                                Monitor and analyse the GSM/WCDMA/HSPA/LTE Radio Network Statistics on
                                                daily basis. Achieve & maintain the Radio Network Performance as per the
                                                contracted OSS KPIs (Accessibility, Availability, Retainability Mobility
                                                & Service Integrity) within company set thresholds.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Responding to all Customer complaints within stipulated SLA. Address
                                                Coverage and capacity complaints from customer by providing
                                                implementable solutions and ensuring
                                                closure as per SLA.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Conducting consistency checks on radio parameters for 2G/3G/4G and daily
                                                execute
                                                corrections with the RNO guidelines.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Analyze Drive test reports including benchmarking reports and implement
                                                optimization
                                                recommendations suggested. Identify pockets of poor network quality
                                                RXQUAL, MOS
                                                and suggest resolutions for clearing interference and KPI degradations.
                                                Confirm cell performance by comparing Netnumen/U2000 alarms and
                                                configurations.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Executing Network dimensioning tasks to address capacity and coverage
                                                requirements by optimally Optimizing network interfaces and nodes to
                                                cater for 2G/3G/LTE voice and data traffic. This will include TRX
                                                additions, 3G upgrades, CE expansions, Power optimization, BSC/RNC board
                                                capacity utilization/dimensioning.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Preparation of network/cells KPIs statistics for analysis of incident
                                                reports.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Managing & reviewing the results of all defined radio Optimization
                                                procedures, preparing the optimization processes for the workflow,
                                                weekly reports, templates, tracking database and time schedule in order
                                                to achieve Telkom standard. Develop and adhere to radio planning
                                                guidelines on rollout and planning procedures.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Handling of trials projects, Feature Testing, POC for new
                                                products/features & produce
                                                trial detailed reports & Business Case Analysis. Follow up on Special
                                                Projects assigned to RNPO with technical reports and results and
                                                practicing Efficient Financial Management.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Performing radio site surveys, site candidate evaluation / selection and
                                                link budget planning for both new radio site integration and/or radio
                                                site relocation.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Carry out optimization techniques (antenna selection for optimal
                                                horizontal/vertical
                                                performance, mechanical/electrical tilting, appropriate transmit power
                                                setting, antenna clearance) for optimal site/cluster performance.
                                            </List.Item>
                                        </List>
                                    </Typography>
                                    <Header as='h3'>Skills & Competencies We Are Looking For:</Header>

                                    <Typography paragraph>
                                        <List as='ol'>
                                            <List.Item as='li' value='*'>
                                                GSM/WCDMA and LTE mobile network concepts
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Must have worked with ZTE/Huawei RAN Equipment
                                            </List.Item>

                                            <List.Item as='li' value='*'>
                                                Proven experience in the use of U2000/PRS/NETNUMEN/ MAPINFO/ACTIX /NEMO,
                                                and Planet Planning tool
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Knowledge on RAN Features/Roadmaps/equipment lifecycles.
                                            </List.Item>
                                            <List.Item as='li' value='*'>
                                                Report Writing & Presentation skills
                                            </List.Item>
                                        </List>
                                    </Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                    </>
                )
            })}

        </div>
    );
}

export default JobAccordion;