// lib/cricket/types.ts

export interface Player {
    id: string;
    name: string;
    role: PlayerRole;
    teamId: string;
    profileImageUrl?: string;
    team?: Team;
  }
  
  export interface Team {
    id: string;
    name: string;
    shortName: string;
    logoUrl?: string;
    players: Player[];
  }
  
  export interface Match {
    id: string;
    title: string;
    description?: string;
    venue: string;
    matchDate: Date;
    status: MatchStatus;
    teamA: Team;
    teamB: Team;
    winner?: Team;
    innings: Innings[];
    eventId?: string;
  }
  
  export interface Innings {
    id: string;
    matchId: string;
    inningsNumber: number;
    battingTeamId: string;
    bowlingTeamId: string;
    battingTeam: Team;
    bowlingTeam: Team;
    totalRuns: number;
    wickets: number;
    overs: number;
    extras: number;
    batting: BattingPerformance[];
    bowling: BowlingPerformance[];
  }
  
  export interface BattingPerformance {
    id: string;
    inningsId: string;
    playerId: string;
    player: Player;
    runs: number;
    ballsFaced: number;
    fours: number;
    sixes: number;
    isOut: boolean;
    dismissalType?: DismissalType;
    dismissalInfo?: string;
  }
  
  export interface BowlingPerformance {
    id: string;
    inningsId: string;
    playerId: string;
    player: Player;
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    noBalls: number;
    wides: number;
  }
  
  export interface BallEvent {
    id: string;
    matchId: string;
    inningsId: string;
    over: number;
    ballInOver: number;
    batsmanOnStrikeId: string;
    nonStrikerId: string;
    bowlerId: string;
    batsmanOnStrike: Player;
    nonStriker: Player;
    bowler: Player;
    runs: number;
    extras: number;
    extrasType?: ExtrasType;
    isWicket: boolean;
    wicketType?: DismissalType;
    comment?: string;
    timestamp: Date;
  }
  
  export interface LeaderboardEntry {
    playerId: string;
    player: Player;
    matches: number;
    innings: number;
    runsScored: number;
    ballsFaced: number;
    fours: number;
    sixes: number;
    wicketsTaken: number;
    oversBowled: number;
    runsConceded: number;
    strikeRate: number;
    battingAverage: number;
    economyRate: number;
    bowlingAverage: number;
  }
  
  export enum MatchStatus {
    UPCOMING = 'UPCOMING',
    LIVE = 'LIVE',
    COMPLETED = 'COMPLETED',
    ABANDONED = 'ABANDONED'
  }
  
  export enum PlayerRole {
    BATSMAN = 'BATSMAN',
    BOWLER = 'BOWLER',
    ALL_ROUNDER = 'ALL_ROUNDER',
    WICKET_KEEPER = 'WICKET_KEEPER'
  }
  
  export enum DismissalType {
    BOWLED = 'BOWLED',
    CAUGHT = 'CAUGHT',
    LBW = 'LBW',
    RUN_OUT = 'RUN_OUT',
    STUMPED = 'STUMPED',
    HIT_WICKET = 'HIT_WICKET',
    RETIRED_HURT = 'RETIRED_HURT',
    OBSTRUCTING_FIELD = 'OBSTRUCTING_FIELD',
    TIMED_OUT = 'TIMED_OUT',
    HANDLED_BALL = 'HANDLED_BALL'
  }
  
  export enum ExtrasType {
    WIDE = 'WIDE',
    NO_BALL = 'NO_BALL',
    BYE = 'BYE',
    LEG_BYE = 'LEG_BYE'
  }